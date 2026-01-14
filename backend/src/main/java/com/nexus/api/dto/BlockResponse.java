package com.nexus.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlockResponse {
    private Long id;
    private String type;
    private String content;
    private Double positionX;
    private Double positionY;
    private Double width;
    private Double height;

    private String status;
    private Integer priority;
    private LocalDateTime dueDate;

    private Long workspaceId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
