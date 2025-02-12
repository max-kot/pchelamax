const token = process.env.TELEGRAM_BOT_TOKEN;;
const chats = [
	{ name: "Вера", id: "728730912" },
];

export const handler = async (event) => {
	try {
		const data = JSON.parse(event.body);
		const { name, phone, message } = data;

		let respond = `новая заявка с сайта!

• Имя: ${name}
• Контактные данные: ${phone}
• Сообщение: ${message}`;

		const url = `https://api.telegram.org/bot${token}/sendMessage`;

		// Отправляем сообщения ВСЕМ пользователям в списке
		for (let { name, id } of chats) {
			//name = data.message.chat['first_name'] || name;


			await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chat_id: id, text: `🔥 ${name}, ${respond}` }),
			});
		}

		return { statusCode: 200, body: "OK" }; // Теперь return срабатывает после всех отправок
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
