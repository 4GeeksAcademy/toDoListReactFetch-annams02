import React, {useEffect, useState} from "react";

//include images into your bundle


//create your first component



const Home = () => { 
	const [inputTarea,setInputTarea] = useState ("")
	const [listaTareas, setListaTareas] = useState ([]);

	function escribirInput (event) {
		setInputTarea(event.target.value);
	}
	
	const pulsarEnter = (e) => {
		if (e.key === "Enter" && inputTarea.trim()   !== "") {
			crearTarea(inputTarea);
		}
	};

	const crearTarea = (inputTarea) => {
		const myHeaders = new Headers ();
		myHeaders.append ("Content-Type", "application/json");

		const raw = JSON.stringify ({
			"label":inputTarea,
			"is_done": false 
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/annamartinez-02", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));

	}


	useEffect (( )=>{
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		  };
		  
		  fetch("https://playground.4geeks.com/todo/users/annamartinez02", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}, [])
	

		

	return (
		<p> Helooo</p>
	);
};

export default Home;
