console.log('Confirmation');
const str = window.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("id");

function main(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = orderId;
    console.log(orderId);
    localStorage.clear();
}
main();