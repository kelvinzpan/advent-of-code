// day1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

int main()
{
    std::vector<int> inputNums;
    std::ifstream input("day1input.txt");
    std::string line;
    while (std::getline(input, line))
    {
        std::istringstream iss(line);
        int num;
        if (!(iss >> num)) { break; }

        inputNums.push_back(num);
    }

    // Part 1
    int numIncreases = 0;
    for (int i = 0; i < inputNums.size() - 1; i++)
    {
        if (inputNums[i] < inputNums[i + 1])
        {
            numIncreases++;
        }
    }

    std::cout << "Part 1: " << numIncreases << "\n";

    // Part 2
    numIncreases = 0;
    for (int i = 0; i < inputNums.size() - 3; i++)
    {
        int window1 = inputNums[i] + inputNums[i + 1] + inputNums[i + 2];
        int window2 = inputNums[i + 1] + inputNums[i + 2] + inputNums[i + 3];

        if (window1 < window2)
        {
            numIncreases++;
        }
    }

    std::cout << "Part 2: " << numIncreases << "\n";
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
