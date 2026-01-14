#pragma once
#include <string>
#include <iostream>
#include "nlohmann/json.hpp"

using json = nlohmann::json;

struct Task {
    int id;
    std::string title;
    int priority; // 1 (High) to 10 (Low)
    int duration; // in minutes

    void print() const {
        std::cout << "Task[" << id << "]: " << title 
                  << " (Priority: " << priority << ", Duration: " << duration << "m)" << std::endl;
    }
};

NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(Task, id, title, priority, duration)
