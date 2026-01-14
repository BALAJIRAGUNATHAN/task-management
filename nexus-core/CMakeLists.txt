cmake_minimum_required(VERSION 3.15)
project(NexusCommandCenter VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(nexus_core src/main.cpp)

# Future dependencies (e.g., Crow for REST, gRPC)
# find_package(Threads REQUIRED)
# target_link_libraries(nexus_core PRIVATE Threads::Threads)
