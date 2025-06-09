document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formModifierProfil");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const displayName = document.getElementById("newDisplayName").value;
        const password = document.getElementById("newPassword").value;
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3333/useraccount/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ displayName, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Erreur serveur : " + errorText);
            }

            const result = await response.json();
            M.toast({ html: "Profil mis à jour avec succès", classes: "green" });
            window.location.href = "profil.html";
        } catch (err) {
            console.error("❌ Erreur lors de la mise à jour :", err);
            M.toast({ html: "Échec de la mise à jour", classes: "red" });
        }
    });
});
