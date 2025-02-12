document.querySelector(".form").addEventListener("submit", async function (e) {
	e.preventDefault(); // ! - если отправка идёт и на почту нужно отрубить
	
	const formData = new FormData(this);
	const jsonData = Object.fromEntries(formData.entries());
	const response = await fetch("/.netlify/functions/telegram", {
		method: "POST",
		body: JSON.stringify(jsonData),
	});

	if (response.ok) console.warn("Сообщение отправлено!");

	else console.warn("Ошибка отправки!");
});