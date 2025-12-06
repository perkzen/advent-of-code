package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func partOne() {
	btyes, err := os.ReadFile("../inputs/day-06.txt")
	if err != nil {
		panic(err)
	}

	raw := string(btyes)
	input := strings.Split(raw, "\n")

	numbers := make([][]int, 0)
	operands := make([][]string, 0)

	for _, line := range input {

		parts := strings.Split(line, " ")

		rNumbers := make([]int, 0)
		rOperands := make([]string, 0)
		for _, part := range parts {
			i, err := strconv.Atoi(part)
			if err != nil {
				if part == "+" || part == "*" {
					rOperands = append(rOperands, part)
				}
				continue
			}

			rNumbers = append(rNumbers, i)
		}
		numbers = append(numbers, rNumbers)
		operands = append(operands, rOperands)
	}

	cols := len(numbers[0])
	rows := len(numbers)
	sum := 0

	for col := 0; col < cols; col++ {

		colResult := 0

		for row := 0; row < rows; row++ {
			if len(numbers[row]) == 0 {
				break
			}
			operand := operands[len(operands)-1][col]

			if operand == "+" {
				colResult += numbers[row][col]
			}
			if operand == "*" {
				if colResult == 0 {
					colResult = 1
				}
				colResult *= numbers[row][col]
			}
		}

		sum += colResult
	}
	fmt.Println("Sum:", sum)
}

func partTwo() {

}

func main() {
	partOne()
	partTwo()
}
