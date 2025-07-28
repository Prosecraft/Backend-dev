package com.prosecraft.document;

import com.prosecraft.document.DocumentModel;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<DocumentModel, Long> {
    List<DocumentModel> findByUserEmail(String email);
}
