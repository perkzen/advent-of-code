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
	fmt.Println("Part 1 sum:", sum)
}

// helper: is this column all spaces?
func isBlankColumn(lines []string, col int) bool {
	for _, line := range lines {
		if col >= len(line) {
			continue
		}
		if line[col] != ' ' {
			return false
		}
	}
	return true
}

func partTwo() {
	btyes, err := os.ReadFile("../inputs/day-06.txt")
	if err != nil {
		panic(err)
	}

	raw := strings.TrimRight(string(btyes), "\n")
	lines := strings.Split(raw, "\n")

	if len(lines) == 0 {
		fmt.Println("Part 2 sum:", 0)
		return
	}

	// Make all lines the same width
	width := 0
	for _, line := range lines {
		if len(line) > width {
			width = len(line)
		}
	}
	for i, line := range lines {
		if len(line) < width {
			lines[i] = line + strings.Repeat(" ", width-len(line))
		}
	}

	rows := len(lines)
	bottomRow := rows - 1 // operator row

	sum := 0

	// Scan problems from right to left
	for col := width - 1; col >= 0; {
		// Skip separator / trailing blank columns
		for col >= 0 && isBlankColumn(lines, col) {
			col--
		}
		if col < 0 {
			break
		}

		// This is the right edge of a problem block
		right := col

		// Move left until we hit a blank column => left edge is col+1
		for col >= 0 && !isBlankColumn(lines, col) {
			col--
		}
		left := col + 1

		// Find operator in bottom row within this block
		var op byte
		for c := left; c <= right; c++ {
			ch := lines[bottomRow][c]
			if ch == '+' || ch == '*' {
				op = ch
				break
			}
		}
		if op == 0 {
			// no operator found, skip this block
			continue
		}

		// Build numbers column-wise, right → left
		colNumbers := make([]int, 0)
		for c := right; c >= left; c-- {
			var sb strings.Builder
			for r := 0; r < bottomRow; r++ { // exclude operator row
				ch := lines[r][c]
				if ch >= '0' && ch <= '9' {
					sb.WriteByte(ch)
				}
			}
			if sb.Len() == 0 {
				continue
			}
			n, err := strconv.Atoi(sb.String())
			if err != nil {
				panic(err)
			}
			colNumbers = append(colNumbers, n)
		}

		if len(colNumbers) == 0 {
			continue
		}

		// Evaluate this problem
		result := colNumbers[0]
		for i := 1; i < len(colNumbers); i++ {
			if op == '+' {
				result += colNumbers[i]
			} else { // '*'
				result *= colNumbers[i]
			}
		}

		sum += result
	}

	fmt.Println("Part 2 sum:", sum)
}

func main() {
	partOne()
	partTwo()
}
