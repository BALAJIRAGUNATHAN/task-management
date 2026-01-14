package com.nexus.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexus.api.dto.TaskDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OptimizationService {

    private final ObjectMapper objectMapper;

    // Configurable path with default fallback
    private static final String DEFAULT_PATH = "../nexus-core/nexus_core";

    private String getEnginePath() {
        String envPath = System.getenv("NEXUS_ENGINE_PATH");
        return (envPath != null && !envPath.isEmpty()) ? envPath : DEFAULT_PATH;
    }

    public List<TaskDto> optimizeTasks(List<TaskDto> tasks) {
        try {
            ProcessBuilder builder = new ProcessBuilder(getEnginePath());
            Process process = builder.start();

            // Write to stdin
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
            String jsonInput = objectMapper.writeValueAsString(tasks);
            writer.write(jsonInput);
            writer.flush();
            writer.close();

            // Read from stdout
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Optimization engine failed with code " + exitCode);
            }

            return objectMapper.readValue(output.toString(), new TypeReference<List<TaskDto>>() {
            });

        } catch (Exception e) {
            throw new RuntimeException("Error processing optimization: " + e.getMessage(), e);
        }
    }
}
