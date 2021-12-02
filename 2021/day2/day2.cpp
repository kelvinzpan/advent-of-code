#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

int main()
{
    std::vector<std::string> inputDir;
    std::vector<int> inputDist;
    std::ifstream input("day2input.txt");
    std::string line;
    while (std::getline(input, line))
    {
        std::istringstream iss(line);
        std::string direction;
        int num;
        if (!(iss >> direction >> num)) { break; }

        inputDir.push_back(direction);
        inputDist.push_back(num);
    }

    // Part 1
    int horizontal = 0, vertical = 0;
    
    for (int i = 0; i < inputDir.size(); i++)
    {
        if (inputDir[i] == "forward")
        {
            horizontal += inputDist[i];
        }
        else if (inputDir[i] == "down")
        {
            vertical += inputDist[i];
        }
        else if (inputDir[i] == "up")
        {
            vertical -= inputDist[i];
        }
    }

    int result = horizontal * vertical;
    std::cout << "Part 1: " << result << "\n";

    // Part 2
    horizontal = 0, vertical = 0;
    int aim = 0;

    for (int i = 0; i < inputDir.size(); i++)
    {
        if (inputDir[i] == "forward")
        {
            horizontal += inputDist[i];
            vertical += inputDist[i] * aim;
        }
        else if (inputDir[i] == "down")
        {
            aim += inputDist[i];
        }
        else if (inputDir[i] == "up")
        {
            aim -= inputDist[i];
        }
    }

    result = horizontal * vertical;
    std::cout << "Part 2: " << result << "\n";
}