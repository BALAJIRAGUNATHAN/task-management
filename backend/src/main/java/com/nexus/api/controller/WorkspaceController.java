package com.nexus.api.controller;

import com.nexus.api.dto.WorkspaceRequest;
import com.nexus.api.dto.WorkspaceResponse;
import com.nexus.api.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService service;

    @PostMapping
    public ResponseEntity<WorkspaceResponse> createWorkspace(
            @RequestBody WorkspaceRequest request,
            Authentication authentication) {
        String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(service.createWorkspace(request, userEmail));
    }

    @GetMapping
    public ResponseEntity<List<WorkspaceResponse>> getUserWorkspaces(
            Authentication authentication) {
        String userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(service.getUserWorkspaces(userEmail));
    }
}
