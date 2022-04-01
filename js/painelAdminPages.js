let largura =
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.body.clientWidth;

if (largura < 911) {
	const painelADMInput = document.querySelector("#input-menu");
	if (painelADMInput.checked === false) {
		painelADMInput.checked = true;
	}
}