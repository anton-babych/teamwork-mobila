package com.teamwork.backend.repositories;

import com.teamwork.backend.entities.Headphone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

public interface HeadphoneRepository extends JpaRepository<Headphone, Long> {
    List<Headphone> findHeadphonesBySmartphonesId(Long smartphoneId);
}
