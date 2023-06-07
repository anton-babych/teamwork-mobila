package com.teamwork.backend.controllers;

import com.teamwork.backend.entities.Headphone;
import com.teamwork.backend.entities.Smartphone;
import com.teamwork.backend.repositories.HeadphoneRepository;
import com.teamwork.backend.repositories.SmartphoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HeadphoneController {
    @Autowired
    private SmartphoneRepository smartphoneRepository;

    @Autowired
    private HeadphoneRepository headphoneRepository;

    @GetMapping("/headphones")
    public ResponseEntity<List<Headphone>> getAllHeadphones() {
        List<Headphone> headphones = new ArrayList<Headphone>();

        headphoneRepository.findAll().forEach(headphones::add);

        if (headphones.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(headphones, HttpStatus.OK);
    }

    @GetMapping("/smartphones/{smartphoneId}/headphones")
    public ResponseEntity<List<Headphone>> getAllHeadphonesBySmartphoneId(@PathVariable(value = "smartphoneId") Long smartphoneId) {
        if (!smartphoneRepository.existsById(smartphoneId)) {
            throw new ResourceNotFoundException("Not found Smartphone with id = " + smartphoneId);
        }

        List<Headphone> headphones = headphoneRepository.findHeadphonesBySmartphonesId(smartphoneId);
        return new ResponseEntity<>(headphones, HttpStatus.OK);
    }

    @GetMapping("/headphones/{id}")
    public ResponseEntity<Headphone> getHeadphonesById(@PathVariable(value = "id") Long id) {
        Headphone headphone = headphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Headphone with id = " + id));

        return new ResponseEntity<>(headphone, HttpStatus.OK);
    }

    @GetMapping("/headphones/{headphoneId}/smartphones")
    public ResponseEntity<List<Smartphone>> getAllSmartphonesByHeadphoneId(@PathVariable(value = "headphoneId") Long headphoneId) {
        if (!headphoneRepository.existsById(headphoneId)) {
            throw new ResourceNotFoundException("Not found Headphone with id = " + headphoneId);
        }

        List<Smartphone> smartphones = smartphoneRepository.findSmartphonesByHeadphonesId(headphoneId);
        return new ResponseEntity<>(smartphones, HttpStatus.OK);
    }

    //add headphone to the phone
    @PostMapping("/add/smartphones/{smartphoneId}/headphones")
    public ResponseEntity<Headphone> addHeadphone(@PathVariable(value = "smartphoneId") Long smartphoneId, @RequestBody Headphone headphoneRequest) {
        Headphone headphone = smartphoneRepository.findById(smartphoneId).map(smartphone -> {
            long headphoneId = headphoneRequest.getId();

            // headphone is existed
            if (headphoneId != 0L) {
                Headphone _headphone = headphoneRepository.findById(headphoneId)
                        .orElseThrow(() -> new ResourceNotFoundException("Not found Headphone with id = " + headphoneId));
                smartphone.addHeadphone(_headphone);
                smartphoneRepository.save(smartphone);
                return _headphone;
            }

            // add and create new Headphone
            smartphone.addHeadphone(headphoneRequest);
            return headphoneRepository.save(headphoneRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Smartphone with id = " + smartphoneId));

        return new ResponseEntity<>(headphone, HttpStatus.CREATED);
    }

    @PutMapping("/update/headphones/{id}")
    public ResponseEntity<Headphone> updateHeadphone(@PathVariable("id") long id, @RequestBody Headphone headphoneRequest) {
        Headphone headphone = headphoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HeadphoneId " + id + "not found"));

        headphone.setH_img(headphoneRequest.getH_img());
        headphone.setH_firm(headphoneRequest.getH_firm());
        headphone.setH_model(headphoneRequest.getH_model());
        headphone.setH_price(headphoneRequest.getH_price());
        headphone.setH_des(headphoneRequest.getH_des());

        return new ResponseEntity<>(headphoneRepository.save(headphone), HttpStatus.OK);
    }

    //delete headphone from phone
    @DeleteMapping("/delete/smartphones/{smartphoneId}/headphones/{headphoneId}")
    public ResponseEntity<HttpStatus> deleteHeadphoneFromSmartphone(@PathVariable(value = "smartphoneId") Long smartphoneId, @PathVariable(value = "headphoneId") Long headphoneId) {
        Smartphone smartphone = smartphoneRepository.findById(smartphoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Smartphone with id = " + smartphoneId));

        smartphone.removeHeadphone(headphoneId);
        smartphoneRepository.save(smartphone);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/headphones")
    public ResponseEntity<HttpStatus> deleteAllHeadphones() {
        List<Smartphone> smartphones = new ArrayList<Smartphone>();

        smartphoneRepository.findAll().forEach(smartphones::add);

        if (smartphones.isEmpty()) {
            headphoneRepository.deleteAll();
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/headphones/{id}")
    public ResponseEntity<HttpStatus> deleteHeadphone(@PathVariable("id") long id) {
        headphoneRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}