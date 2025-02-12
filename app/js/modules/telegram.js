document.querySelector(".form").addEventListener("submit", async function (e) {
	//e.preventDefault(); // !

	const formData = new FormData(this);
	const jsonData = Object.fromEntries(formData.entries());
	const response = await fetch("/.netlify/functions/telegram", {
		method: "POST",
		body: JSON.stringify(jsonData),
	});

	if (response.ok) console.log("Отправлено!");
	//window.location.href = 'https://veratarget.com/success'
	else console.warn("Ошибка отправки!");
});