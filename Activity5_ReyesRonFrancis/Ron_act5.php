<?php
$overall = 0;

$items = array(
    array(
        "quant" =>  2,
        "price" => 100
    ),
    array(
        "quant" =>  7,
        "price" => 35
    ),
    array(
        "quant" =>  1,
        "price" => 350
    ),
    array(
        "quant" =>  2,
        "price" => 20
    )
);

newReceipt($items, $overall);

function newReceipt($items, $overall){
    $itemNo = 1;
    echo("QTY  DESC    AMT TOTAL \n");     
    echo("----------------------------- \n");
    foreach($items as $item){
        $quant = $item["quant"];
        $price = $item["price"];
        $total = $quant * $price;
        $overall += $total;
        
        echo("($quant)  ITEM $itemNo  $price  $total \n");
        $itemNo++;
    }
    echo("----------------------------- \n");
    echo("Overall Total PHP $overall");
}
?>