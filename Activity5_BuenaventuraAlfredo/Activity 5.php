<?php
$item1_qty = 2;
$item1_price = 100;
$item1_total = $item1_qty * $item1_price;

$item2_qty = 7;
$item2_price = 35;
$item2_total = $item2_qty * $item2_price;

$item3_qty = 1;
$item3_price = 350;
$item3_total = $item3_qty * $item3_price;

$item4_qty = 2;
$item4_price = 20;
$item4_total = $item4_qty * $item4_price;

$overall_total = $item1_total + $item2_total + $item3_total + $item4_total;

echo "QTY     DESC        AMT    Total\n";
echo "-------------------------------------\n";
echo "(" . $item1_qty . ")     ITEM 1      " . $item1_price . "     " . $item1_total . "\n";
echo "(" . $item2_qty . ")     ITEM 2      " . $item2_price . "      " . $item2_total . "\n";
echo "(" . $item3_qty . ")     ITEM 3      " . $item3_price .       "     " . $item3_total . "\n";
echo "(" . $item4_qty . ")     ITEM 4      " . $item4_price . "      " . $item4_total . "\n";
echo "-------------------------------------\n";
echo "Overall Total               Php " . $overall_total . "\n";

?>