document.getElementById('userForm').addEventListener('submit', async(e) => {
    e.preventDefault();
});
        <tr>
            <td>${user.firstName}</td> 
            <td>${user.lastName}</td>
            <td>${user.city}</td>
            <td>${user.adress}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>
                <button onclick="deleteUser(${user.id})">Törlés</button>
                <button onclick="getUsers(${user.id})">Módosítás</button>
            </td>   
        </tr>
        
const e = require("express");

//felhasználói adat módosítás
async function getUsers() {
    const newFirstName = prompt("Add meg az új felhasználónevet:");
    const newLastName = prompt("Add meg az új email címet:");
    const newCity = prompt("Add meg az új várost:");
    const newAdress = prompt("Add meg az új címet:");
    const newPhone = prompt("Add meg az új telefonszámot:");
    const newEmail = prompt("Add meg az új email címet:");
    const newGender = prompt("Add meg az új nemet:");

    if (newFirstName && newLastName && newCity && newAdress && newPhone && newEmail && newGender) {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: newFirstName,
                    lastName: newLastName,
                    city: newCity,
                    adress: newAdress,
                    phone: newPhone,
                    email: newEmail,
                    gender: newGender
                })
            });
            if (response.ok) {
                alert('Felhasználó sikeresen módosítva.');
                getUsers(); // Frissítse a felhasználói listát módosítás után
            }
            else {
                const errorData = await response.json();
                console.error('Hiba a felhasználó módosításakor:', errorData);
            }
        }
        catch (e) {
            console.error('Hiba a felhasználó módosításakor:', e);
        }
}}

//felhasználói adat törlés

async function deleteUser(id) {
    if (confirm(`Biztos törölni akarod ezt az ID-t: ${id}?`)) {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Felhasználó sikeresen törölve.');
                getUsers(); // Frissítse a felhasználói listát törlés után
            }
            else {
                const errorData = await response.json();
                console.error('Hiba a felhasználó törlésekor:', errorData);
                alert(`Hiba történt a felhasználó törlésekor: ${errorData.message}`);
            }
        }
        catch (e) {
            console.error('Hiba a felhasználó törlésekor:', error);
            alert('Hiba történt a felhasználó törlésekor.');
        }
    }
}
getUsers();