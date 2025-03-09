//config
var pokemon = [];
var currentIndex = 0;
var url = "https://script.google.com/macros/s/AKfycbwbk9p7qra3Peg9Ka4JS2UkyIxumHMinZo6Surppo4NfRi2Ky49djM25W7SAEjGmHq-/exec";


$(function () {
    console.log("ready!");
    //綁
    $("#leftBtn").on("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updatePokemon();
        }
    });
    $("#rightBtn").on("click", function () {
        if (currentIndex < pokemon.length - 1) {
            currentIndex++;
            updatePokemon();
        }
    });
});
//更新畫面
function updatePokemon() {
    $("#sprite").attr("src", pokemon[currentIndex].sprite);
    $("#pokemonName").text(pokemon[currentIndex].name);
    $("#pokemonInfo").text("HP:"+pokemon[currentIndex].hp + " SPEED:"+pokemon[currentIndex].speed);

}

//更新商品圖html
function getHtml(pokemonItem){
    var html = `
    <div id="pool" class="col-md-3">
        <div class="product-item">
            <figure class="product-style">
                <img src="${pokemonItem.sprite}" alt="Books" class="product-item">
                <button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to
                    Cart</button>
            </figure>
            <figcaption>
                <h3>${pokemonItem.name}</h3>
                <span>${pokemonItem.author}</span>
                <div class="item-price">$ ${pokemonItem.price}</div>
            </figcaption>
        </div>
    </div>
    `;
    return html;
}

//呼叫ajax
$.ajax({
    url: url,
    dataType: "json",
    type: "get",
    //data:data,
    //Type: Function(Anything data, String textStatus, jqXHR jqXHR)
    success: OnOk,

    //Type: Function(jqXHR jqXHR, String textStatus, String errorThrown)
    error: function (jqXHR, textStatus, errorThrown) {

    }
});

//處理ajax
function OnOk(data, textStatus, jqXHR) {
    //console.log(JSON.stringify(data));  //for debu
    pokemon = data;  //存資料
    // currentIndex = 0;  //重新調整縮引
    // updatePokemon();  //更新畫面
    var html = '';
    for(var i = 0; i < pokemon.length; i++){
        html += getHtml(pokemon[i]);
    }
    $("#pool").append(html);
}
