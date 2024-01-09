const cols = document.querySelectorAll('.col');

// смена цветов нажатием на пробел

document.addEventListener('keydown', (event) => {
	event.preventDefault()
	if(event.code.toLowerCase() === 'space') {
		setRendomColors()
	}
})

// изменение состояния замка с открытого на закрытый
document.addEventListener('click', event => {
	const type = event.target.dataset.type;

	if(type === 'lock') {
		const node = event.target.tagName.toLowerCase() === 'lock'
		? event.target
		: event.target.children[0]

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	} else if(type === 'copy') {
		copyClickCoard(event.target.textContent)
	}
})

// функция генерирует рандомные цвета

function generateRandomColors() {

	const hexCodes = '0123456789ABCDEF';
	let color = '';
	for(let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}

	return '#' + color;
}

// копировать код цвета при клике

function copyClickCoard(text) {
	return navigator.clipboard.writeText(text);
}

// добавляем рандомные цвета для колонок
function setRendomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];
	cols.forEach((col, i) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2');
		const button = col.querySelector('button');
		

		if(isLocked) {
			colors.push(text.textContent)
			return;
		}

		const color = isInitial 
		? colors[i] 
			? colors[i]
			: chroma.random()
		: chroma.random();

		if(!isInitial) {
			colors.push(color)
		}
		
		text.textContent = color;
		col.style.background = color;

		setTextColor(text, color)
		setTextColor(button, color)

		updateColorsHash(colors)
	})
}

// определение цвета текста в зависимости от яркости фона
function setTextColor(text, color) {
	const luminance = chroma(color).luminance();

	text.style.color = luminance > 0.5 ? 'black' : 'white'

}

// сохранение выбраных цветов в адресной строке
function updateColorsHash(colors = []) {
	document.location.hash = colors.map(col => {
		return col.toString().substring(1)
	}).join('-');
}

function getColorsFromHash() {
	if(document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map(color => '#' + color)
	}

	return []
}
setRendomColors(true)