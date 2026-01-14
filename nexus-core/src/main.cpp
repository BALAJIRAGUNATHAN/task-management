#include <iostream>
#include <vector>
#include <string>
#include "../include/Task.h"
#include "../include/Scheduler.h"

using json = nlohmann::json;

int main() {
    // Read JSON from stdin
    std::string input_str;
    std::string line;
    while (std::getline(std::cin, line)) {
        input_str += line;
    }

    if (input_str.empty()) {
        std::cerr << "No input provided!" << std::endl;
        return 1;
    }

    try {
        auto j = json::parse(input_str);
        std::vector<Task> tasks = j.get<std::vector<Task>>();

        Scheduler scheduler;
        for (const auto& task : tasks) {
            scheduler.addTask(task);
        }

        scheduler.optimize();

        // Output optimized list as JSON
        std::vector<Task> optimized_tasks = scheduler.getTasks();
        json j_out = optimized_tasks;
        std::cout << j_out.dump(4) << std::endl;

    } catch (const std::exception& e) {
        std::cerr << "Error parsing JSON: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
