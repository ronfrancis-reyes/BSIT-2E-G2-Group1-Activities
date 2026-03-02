<?php

echo "<pre>";

$items = [
    [2, "ITEM 1", 100, "       "],
    [7, "ITEM 2", 35,  "        "],
    [1, "ITEM 3", 350, "       "],
    [2, "ITEM 4", 20,  "        "]
];

echo "QTY   DESC     AMT     Total\n";
echo "----------------------------\n";

$overallTotal = 0;

foreach ($items as $item) {
    $qty   = $item[0];
    $desc  = $item[1];
    $amt   = $item[2];
    $space = $item[3];

    $total = $qty * $amt;
    $overallTotal += $total;

    echo "(" . $qty . ")" . $desc . "      " . $amt . "" . $space . $total . "\n";
}

echo "----------------------------\n";
echo "Overall Total         Php " . $overallTotal;

echo "</pre>";

?>