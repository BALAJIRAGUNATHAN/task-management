package com.nexus.api.controller;

import com.nexus.api.dto.TaskDto;
import com.nexus.api.service.OptimizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/optimize")
@RequiredArgsConstructor
public class OptimizationController {

    private final OptimizationService optimizationService;

    @PostMapping
    public ResponseEntity<List<TaskDto>> optimize(@RequestBody List<TaskDto> tasks) {
        return ResponseEntity.ok(optimizationService.optimizeTasks(tasks));
    }
}
