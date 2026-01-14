#pragma once
#include <vector>
#include <algorithm>
#include "Task.h"

class Scheduler {
private:
    std::vector<Task> tasks;

public:
    void addTask(const Task& task) {
        tasks.push_back(task);
    }

    std::vector<Task> getTasks() const {
        return tasks;
    }

    // High performance optimization algorithm (Simulated)
    // Sorts by Priority (ASC) and then Duration (ASC)
    void optimize() {
        std::sort(tasks.begin(), tasks.end(), [](const Task& a, const Task& b) {
            if (a.priority != b.priority) {
                return a.priority < b.priority; // Lower number = Higher priority
            }
            return a.duration < b.duration; // Shortest job first
        });
    }

    void execute() {
        std::cout << "\n--- Optimized Execution Schedule ---\n";
        int totalTime = 0;
        for (const auto& task : tasks) {
            task.print();
            totalTime += task.duration;
        }
        std::cout << "Total Estimated Time: " << totalTime << " minutes\n";
    }
};
