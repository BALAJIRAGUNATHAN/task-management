package com.nexus.api.repository;

import com.nexus.api.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    List<Workspace> findAllByOwnerId(Long ownerId);
}
