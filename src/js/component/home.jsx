import React, {useEffect, useState} from "react";

//include images into your bundle


//create your first component



const Home = () => { 
	const [inputTarea,setInputTarea] = useState ("")  //iniciamos con string vacío inputTarea
	const [listaTareas, setListaTareas] = useState ([]); // iniciamos con array vacío listaTareas

	const escribirInput = (event) => {   // definimos función clásica: const NombreFunción = (parametros) => {} // el event es un parametro 
		setInputTarea(event.target.value); // aquí accderás al valor del input que escriba el usuario y el setInputTarea actualizará la var InputTarea
	}
	
	const pulsarEnter = (e) => {
		if (e.key === "Enter" && inputTarea.trim()   !== "") { // controlar el enter, .trim es para quitar espacios.  así no se me guardará nueva tarea con espacios vacíos solo
			crearTarea(inputTarea); 
			setInputTarea("");
		}
	};

	const crearTarea = (taskName) => {
		const myHeaders = new Headers ();    // de esta  l25, a la l43, lo saco de postman (code)
		myHeaders.append ("Content-Type", "application/json");

		const raw = JSON.stringify ({
			"label":taskName,                  // esto lo saco de la documentación de la API (/todo/username) la label le doy valor taskName pq es el nombre del parametro de la l.24, y la llamo en crearTarea (l20). 
			"is_done": false 
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/annams02", requestOptions)
			.then(async (response) => {
				const jsonResponse = await response.json();
				setListaTareas([...listaTareas, {
					"id": jsonResponse.id,
					"label":taskName,                  // esto lo saco de la documentación de la API (/todo/username) la label le doy valor taskName pq es el nombre del parametro de la l.24, y la llamo en crearTarea (l20). 
					"is_done": false 
				}]);
			})
			.catch((error) => console.error(error));

	}

	const deleteItems = (tareaId) => {
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		  };
		  
		  fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					setListaTareas(listaTareas.filter ((tarea) => {
						return tareaId != tarea.id;
					}));
				}

			})
			.catch((error) => console.error(error));
	}


	useEffect (( )=>{
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		  };
		  
		  fetch("https://playground.4geeks.com/todo/users/annams02", requestOptions)
			.then(async (response) => {
				const jsonResponse = await response.json();
				setListaTareas(jsonResponse.todos);
			})
			.catch((error) => console.error(error));
	}, [])
	

		

	return (
		<div className="container">
			<div className="text-center txt-light my-4">
				<h1><strong>TO DO LIST</strong></h1>
				<ul>
					<li><input className= "form-control m-auto" type="text" onChange={escribirInput} onKeyDown={pulsarEnter} value={inputTarea} placeholder="What do you need in your to do list?" ></input> </li>
					{listaTareas.map((tarea, index) => <li key={index}>{tarea.label} <button onClick={() => deleteItems(tarea.id)}><i className="fas fa-trash"></i></button></li>)}
			
				</ul>	
			</div>

				<div className="text-center text-bold my-4 total"> {listaTareas.length} tasks </ div>

		</div>
	);
};

export default Home;
