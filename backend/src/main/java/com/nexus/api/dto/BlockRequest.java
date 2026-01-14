package com.nexus.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlockRequest {
    private String type;
    private String content;
    private Double positionX;
    private Double positionY;
    private Double width;
    private Double height;
    private Long workspaceId;

    private String status;
    private Integer priority;
    private String dueDate; // ISO string for simplicity in DTO
}
