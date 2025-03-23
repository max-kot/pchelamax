export class SendForm {
	constructor(form, btn, options) {
		const defaultOptions = {
			syncedSelector: '[data-value-sync]',
			onSuccess: () => {},
			onError: () => {}
		};

		this.options = { ...defaultOptions, ...options };
		this.formSelector = form || '[data-send-form]';
		this.btnSelector = btn || '[data-send-form-btn]';

		this.form = document.querySelector(this.formSelector);
		this.btns = document.querySelectorAll(this.btnSelector);

		this.init();
	}

	resetSyncedInputs() {
		const { syncedSelector } = this.options;

		const syncedInputs = document.querySelectorAll(syncedSelector);
		syncedInputs.forEach(input => {
			input.classList.remove('has-value');
			if (!input.hasAttribute('data-select')) {
				input.value = '';
			}
		});
	}


	init() {
		if (!this.form && !this.btns.length) {
			console.warn(`[SendForm]: Form ${this.formSelector} ot button ${this.btnSelector} is not found!`);
			return
		}

		this.btns.forEach(btn => btn.addEventListener('click', e => this.form.requestSubmit()))

		// Перехватываем отправку основной формы и обрабатываем ее вручную
		this.form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const formData = new FormData(this.form);

			try {
				const response = await fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams(formData).toString(),
				});

				if (response.ok) {
					console.log('Success')
					//this.form.reset();
					this.options.onSuccess?.();
					this.resetSyncedInputs()
				} else {
					throw new Error('Ошибка ответа сервера');
				}
			} catch (error) {
				this.options.onError?.();
				console.error("Ошибка отправки формы:", error);
			}
		});
	}
}