document.addEventListener("DOMContentLoaded", function(){

    const map = L.map("map").setView([13.6929,-89.2182],12);


    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:"© OpenStreetMap"
        }
    ).addTo(map);



    const sucursales = [

        {
            nombre:"Nova Market Escalón",
            direccion:"Paseo General Escalón",
            estado:"Abierta",
            coords:[13.7048,-89.2365]
        },

        {
            nombre:"Nova Market Santa Elena",
            direccion:"Antiguo Cuscatlán",
            estado:"Abierta",
            coords:[13.6765,-89.2402]
        },

        {
            nombre:"Nova Market Metrocentro",
            direccion:"San Salvador",
            estado:"Cerrada",
            coords:[13.7017,-89.2248]
        }

    ];



    let marcadores=[];



    function cargarMapa(lista){


        marcadores.forEach(m=>{
            map.removeLayer(m);
        });


        marcadores=[];


        lista.forEach(sucursal=>{


            let color = sucursal.estado==="Abierta"
            ? "green"
            : "red";



            let icon = L.divIcon({

                html:`
                <div style="
                background:${color};
                width:20px;
                height:20px;
                border-radius:50%;
                border:3px solid white;">
                </div>
                `,

                className:""

            });



            let marcador = L.marker(
                sucursal.coords,
                {icon:icon}
            )
            .addTo(map);



            marcador.bindPopup(`

                <h3>${sucursal.nombre}</h3>

                <p>
                📍 ${sucursal.direccion}
                </p>

                <b>${sucursal.estado}</b>

            `);



            marcadores.push(marcador);


        });


    }



    cargarMapa(sucursales);



    // Buscar

    document
    .getElementById("searchInput")
    .addEventListener("input",function(){


        let texto=this.value.toLowerCase();


        let resultado=sucursales.filter(s=>

            s.nombre.toLowerCase()
            .includes(texto)

        );


        cargarMapa(resultado);


    });




    // Filtro

    document
    .getElementById("departmentFilter")
    .addEventListener("change",function(){


        if(this.value==="Todas"){

            cargarMapa(sucursales);

        }


    });




    // Ubicación

    document
    .getElementById("btnLocate")
    .onclick=function(){


        navigator.geolocation.getCurrentPosition(pos=>{


            let ubicacion=[

                pos.coords.latitude,

                pos.coords.longitude

            ];



            L.marker(ubicacion)
            .addTo(map)
            .bindPopup("Tu ubicación")
            .openPopup();



            map.setView(ubicacion,15);


        });


    };




    // Reset

    document
    .getElementById("btnReset")
    .onclick=function(){


        map.setView(
            [13.6929,-89.2182],
            12
        );


        cargarMapa(sucursales);


    };



});