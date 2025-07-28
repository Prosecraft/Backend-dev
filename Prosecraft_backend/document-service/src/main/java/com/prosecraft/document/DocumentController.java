package com.prosecraft.document;

import com.prosecraft.document.DocumentModel;
import com.prosecraft.document.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentRepository documentRepository;

    @PostMapping
    public ResponseEntity<?> saveDocument(@RequestBody DocumentModel doc, Principal principal) {
        try {
            doc.setUserEmail(principal.getName());
            DocumentModel savedDoc = documentRepository.save(doc);
            return ResponseEntity.ok(Map.of("message", "Document saved successfully", "document", savedDoc));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getDocuments(Principal principal) {
        try {
            List<DocumentModel> documents = documentRepository.findByUserEmail(principal.getName());
            return ResponseEntity.ok(Map.of("documents", documents));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
