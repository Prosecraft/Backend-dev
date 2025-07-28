package com.prosecraft.grammar;

import com.prosecraft.grammar.GrammarCheck;
import com.prosecraft.grammar.GrammarCheckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grammar")
@RequiredArgsConstructor
public class GrammarController {

    private final GrammarCheckRepository grammarCheckRepository;

    @PostMapping
    public ResponseEntity<?> checkText(@RequestBody Map<String, String> request, Principal principal) {
        String input = request.get("text");
        if (input == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Text field is required"));
        }
        try {
            String correction = input.replaceAll(" teh ", " the ");
            GrammarCheck check = GrammarCheck.builder()
                .userEmail(principal.getName())
                .originalText(input)
                .correctedText(correction)
                .checkedAt(LocalDateTime.now())
                .build();
            grammarCheckRepository.save(check);
            return ResponseEntity.ok(Map.of("correctedText", correction));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> history(Principal principal) {
        try {
            List<GrammarCheck> history = grammarCheckRepository.findByUserEmail(principal.getName());
            return ResponseEntity.ok(Map.of("history", history));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
