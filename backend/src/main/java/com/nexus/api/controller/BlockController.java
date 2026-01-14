package com.nexus.api.controller;

import com.nexus.api.dto.BlockRequest;
import com.nexus.api.dto.BlockResponse;
import com.nexus.api.service.BlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blocks")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService service; // Fixed name
    private final org.springframework.messaging.simp.SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<BlockResponse> createBlock(@RequestBody BlockRequest request) {
        BlockResponse response = service.createBlock(request);
        messagingTemplate.convertAndSend("/topic/workspace/" + request.getWorkspaceId(), response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/workspace/{workspaceId}")
    public ResponseEntity<List<BlockResponse>> getBlocks(@PathVariable Long workspaceId) {
        return ResponseEntity.ok(service.getBlocksByWorkspace(workspaceId));
    }

    @PutMapping("/{blockId}")
    public ResponseEntity<BlockResponse> updateBlock(@PathVariable Long blockId, @RequestBody BlockRequest request) {
        BlockResponse response = service.updateBlock(blockId, request);
        messagingTemplate.convertAndSend("/topic/workspace/" + request.getWorkspaceId(), response);
        return ResponseEntity.ok(response);
    }
}
