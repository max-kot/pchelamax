const token = "7291827046:AAEKBYiBzt9hB28P3Kt6QMQbMWsOe_9OQqs";
const chatId = "-1001449215447";

export const handler = async (event) => {

	try {
		const data = JSON.parse(event.body);
		const {name, phone, message} = data;
		let respond = `📩 Новая заявка с сайта!
		
		• Имя: ${name}
		• Контактные данные: ${phone}
		• Сообщение: ${message}
		`;

		const url = `https://api.telegram.org/bot${token}/sendMessage`;

		await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chat_id: chatId, text: respond })
		});
		return { statusCode: 200, body: "OK" };
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
