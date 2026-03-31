

function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            
            const tbody = document.getElementById("tablaContactos");

            
            tbody.innerHTML = "";

            
            data.data.forEach((contacto) => {
                
                const tr = document.createElement("tr");

                
                tr.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                `;

                
                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Error al obtener contactos:", error);
        });
}


mostrarContactos();

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    
    e.preventDefault();

    
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;

    
    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombre, telefono: telefono })
    })
    .then((response) => response.json())
    .then((data) => {
        
        mostrarContactos();

        
        form.reset();
    })
    .catch((error) => {
        console.error("Error al crear contacto:", error);
    });
});

function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";

            data.data.forEach((contacto) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button onclick="eliminarContacto(${contacto.id})">
                            Eliminar
                        </button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        });
}

function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => {
        
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al eliminar:", error);
    });
}

function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";

            data.data.forEach((contacto) => {
                const tr = document.createElement("tr");

                
                tr.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-danger delete-btn">
                            Eliminar
                        </button>
                    </td>
                `;

                
                tr.querySelector(".delete-btn").addEventListener("click", () => {
                    eliminarContacto(contacto.id);
                });

                tbody.appendChild(tr);
            });
        })
        .catch((error) => {
            console.error("Error al cargar contactos:", error);
        });
}

function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        
        alert(data.message || "Contacto eliminado correctamente");

        
        mostrarContactos();
    })
    .catch((error) => {
        console.error("Error al eliminar contacto:", error);
    });
}