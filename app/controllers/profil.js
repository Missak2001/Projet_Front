document.addEventListener('DOMContentLoaded', () => {
    afficherInfosProfil();
});

async function afficherInfosProfil() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch('http://localhost:3333/useraccount/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error('Erreur d\'authentification');

        const user = await res.json();
        document.getElementById('displayName').innerText = user.displayName || '---';
        document.getElementById('login').innerText = user.login;
        document.getElementById('role').innerText = user.isEnterprise ? 'Entreprise' : (user.role === 'admin' ? 'Admin' : 'Utilisateur');
    } catch (err) {
        console.error(err);
        window.location.href = 'login.html';
    }
}

function logout() {
    sessionStorage.removeItem('token');
    window.location.href = 'login.html';
}

