const aside = document.querySelector('aside');
const openNavBtn = document.querySelector('#open-nav-btn');
const closeNavBtn = document.querySelector('#close-nav-btn');

const openNav = () => {
	aside.classList.add('active');
};
const closeNav = () => {
	aside.classList.remove('active');
};
openNavBtn.addEventListener('click', openNav);
closeNavBtn.addEventListener('click', closeNav);
aside.addEventListener('click', (event) => event.currentTarget.tagName === 'ASIDE' && closeNav());

document.querySelector('#form').addEventListener('submit', (event) => {
	event.preventDefault();

	const inputField = document.querySelector('#input');
	const userMessage = inputField.value;
	const messageCon = document.querySelector('#message-con');

	// Append user message to conversation
	messageCon.innerHTML += `
        <div class="myMssg">
            <div class="group">
                <div class="mssg">${userMessage}</div>
            </div>
            <div class="initials">You</div>
        </div>
    `;
	messageCon.scrollTo(0, messageCon.scrollHeight);

	// Clear input field
	inputField.value = '';

	// Send user message to the server using AJAX
	$.ajax({
		type: 'POST',
		url: 'http://localhost:5005/webhooks/rest/webhook',
		contentType: 'application/json',
		data: JSON.stringify({ message: userMessage }),
		success: function (data) {
			console.log(data);
			// const botResponse = data.response;

			// Append chatbot's message to conversation
			messageCon.innerHTML += `
        <div class="userMssg">
          <div class="initials">CG</div>
          <div class="group">
            ${data.map((response) => `<div class="mssg">${response?.text}</div>`).join('')}
          </div>
        </div>
      `;
			messageCon.scrollTo(0, messageCon.scrollHeight);
		},
	});
});