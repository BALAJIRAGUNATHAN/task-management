package com.nexus.api.service;

import com.nexus.api.dto.BlockRequest;
import com.nexus.api.dto.BlockResponse;
import com.nexus.api.model.Block;
import com.nexus.api.model.Workspace;
import com.nexus.api.repository.BlockRepository;
import com.nexus.api.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlockService {

        private final BlockRepository blockRepository;
        private final WorkspaceRepository workspaceRepository;

        public BlockResponse createBlock(BlockRequest request) {
                Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                                .orElseThrow(() -> new RuntimeException("Workspace not found"));

                Block block = Block.builder()
                                .type(request.getType())
                                .content(request.getContent())
                                .positionX(request.getPositionX())
                                .positionY(request.getPositionY())
                                .width(request.getWidth())
                                .height(request.getHeight())
                                .status(request.getStatus() != null ? request.getStatus() : "TODO")
                                .priority(request.getPriority() != null ? request.getPriority() : 5)
                                .dueDate(request.getDueDate() != null
                                                ? java.time.LocalDateTime.parse(request.getDueDate())
                                                : null)
                                .workspace(workspace)
                                .build();

                Block saved = blockRepository.save(block);
                return mapToResponse(saved);
        }

        public List<BlockResponse> getBlocksByWorkspace(Long workspaceId) {
                Workspace workspace = workspaceRepository.findById(workspaceId)
                                .orElseThrow(() -> new RuntimeException("Workspace not found"));

                return workspace.getBlocks().stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }

        public BlockResponse updateBlock(Long blockId, BlockRequest request) {
                Block block = blockRepository.findById(blockId)
                                .orElseThrow(() -> new RuntimeException("Block not found"));

                if (request.getContent() != null)
                        block.setContent(request.getContent());
                if (request.getPositionX() != null)
                        block.setPositionX(request.getPositionX());
                if (request.getPositionY() != null)
                        block.setPositionY(request.getPositionY());
                if (request.getWidth() != null)
                        block.setWidth(request.getWidth());
                if (request.getHeight() != null)
                        block.setHeight(request.getHeight());
                if (request.getStatus() != null)
                        block.setStatus(request.getStatus());
                if (request.getPriority() != null)
                        block.setPriority(request.getPriority());
                if (request.getDueDate() != null)
                        block.setDueDate(java.time.LocalDateTime.parse(request.getDueDate()));

                return mapToResponse(blockRepository.save(block));
        }

        private BlockResponse mapToResponse(Block block) {
                return BlockResponse.builder()
                                .id(block.getId())
                                .type(block.getType())
                                .content(block.getContent())
                                .positionX(block.getPositionX())
                                .positionY(block.getPositionY())
                                .width(block.getWidth())
                                .height(block.getHeight())
                                .status(block.getStatus())
                                .priority(block.getPriority())
                                .dueDate(block.getDueDate())
                                .workspaceId(block.getWorkspace().getId())
                                .createdAt(block.getCreatedAt())
                                .updatedAt(block.getUpdatedAt())
                                .build();
        }
}
