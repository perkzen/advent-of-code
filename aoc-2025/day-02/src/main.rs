use std::fs;

fn is_invalid_id(id: &i64) -> bool {
    let s = id.to_string();

    if s.len() % 2 != 0 {
        return false;
    }

    let mid = s.len() / 2;
    let (left, right) = s.split_at(mid);

    return left == right;
}

fn is_invalid_id_part_two(id: &i64) -> bool {
    let s = id.to_string();

    for len in 1..=(s.len() / 2) {
        if s.len() % len != 0 {
            continue;
        }

        let pattern = &s[0..len];

        let k = s.len() / len;
        if pattern.repeat(k) == s {
            return true;
        }
    }

    return false;
}

fn parse_ranges(input: &str) -> impl Iterator<Item = (i64, i64)> + '_ {
    input
        .split(',')
        .filter(|s| !s.trim().is_empty())
        .map(|range| {
            let mut parts = range.split('-');
            let lower: i64 = parts.next().unwrap().parse().unwrap();
            let upper: i64 = parts.next().unwrap().parse().unwrap();
            (lower, upper)
        })
}

fn sum_invalid_ids<F>(input: &str, is_invalid: F) -> i64
where
    F: Fn(i64) -> bool,
{
    parse_ranges(input)
        .map(|(lower, upper)| (lower..=upper).filter(|id| is_invalid(*id)).sum::<i64>())
        .sum()
}

fn part_one(input: &str) {
    let sum = sum_invalid_ids(input, |id| is_invalid_id(&id));
    println!("Sum of invalid IDs (part one): {}", sum);
}

fn part_two(input: &str) {
    let sum = sum_invalid_ids(input, |id| is_invalid_id_part_two(&id));
    println!("Sum of invalid IDs (part two): {}", sum);
}

fn main() {
    let input = fs::read_to_string("../inputs/day-02.txt").expect("Unable to read input file");

    part_one(&input);
    part_two(&input);
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

    #[test]
    fn part_one_example() {
        let sum = sum_invalid_ids(TEST_INPUT, |x| is_invalid_id(&x));
        assert_eq!(sum, 1_227_775_554);
    }

    #[test]
    fn part_two_example() {
        let sum = sum_invalid_ids(TEST_INPUT, |x| is_invalid_id_part_two(&x));
        assert_eq!(sum, 4_174_379_265);
    }
}
