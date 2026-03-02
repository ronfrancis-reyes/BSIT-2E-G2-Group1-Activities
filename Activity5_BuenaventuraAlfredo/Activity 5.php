<?php
function createReceipt($items) {
    $overall_total = 0;
    $item_number = 1;

    echo "QTY   DESC      AMT    Total\n";
    echo "---------------------------------\n";

    foreach ($items as $item) {

        $qty = $item['qty'];
        $amt = $item['amt'];
        $total = $qty * $amt;

        echo "(" . $qty . ")   ITEM " . $item_number . "    " . $amt . "    " . $total . "\n";

        $overall_total += $total;
        $item_number++;
    }

    echo "---------------------------------\n";
    echo "Overall Total         Php " . $overall_total . "\n";
}

$items = [
    ["qty" => 2, "amt" => 100],
    ["qty" => 7, "amt" => 35],
    ["qty" => 1, "amt" => 350],
    ["qty" => 2, "amt" => 20]
];

createReceipt($items);

?>