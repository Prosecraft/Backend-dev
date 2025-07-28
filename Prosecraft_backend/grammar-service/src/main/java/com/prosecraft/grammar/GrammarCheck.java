package com.prosecraft.grammar;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrammarCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @Lob
    private String originalText;

    @Lob
    private String correctedText;

    private LocalDateTime checkedAt;
}
