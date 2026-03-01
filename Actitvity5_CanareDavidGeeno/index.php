<?php
$amount = array("Item 1" => 100, "Item 2" => 35, "Item 3" => 350, "Item 4" => 20);
$qty = array("Item 1" => 2, "Item 2" => 7, "Item 3" => 1, "Item 4" => 2);

printReceipt($qty, $amount);
function printReceipt($qty, $amt) {
    $overallTotal = 0;
    echo "QTY  DESC      AMT    Total\n";
    echo "-------------------------------\n";

    foreach ($amt as $item => $value) {
        if ($qty[$item] != 0) { //if qty is 0, don't print the item
            if ($value < 100) { //for formatting
                echo "" . $qty[$item] . "    " . $item . "    " . $value . "     " . ($qty[$item] * $value) . "\n";
            } else {
                echo "" . $qty[$item] . "    " . $item . "    " . $value . "    " . ($qty[$item] * $value) . "\n";
            }

            $overallTotal += $value * $qty[$item];
        }
    }

    echo "-------------------------------\n";
    echo "Overall Total: " ."    Php". $overallTotal;
}
?>