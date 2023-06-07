package com.teamwork.backend.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "smartphones")
public class Smartphone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "s_img")
    private String s_img;

    @Column(name = "s_firm")
    private String s_firm;

    @Column(name = "smodel")
    private String smodel;

    @Column(name = "s_price")
    private Integer s_price;

    @Column(name = "s_des")
    private String s_des;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "smartphone_headphones",
            joinColumns = { @JoinColumn(name = "smartphone_id") },
            inverseJoinColumns = { @JoinColumn(name = "headphone_id") })
    private Set<Headphone> headphones = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getS_img() {
        return s_img;
    }

    public void setS_img(String s_img) {
        this.s_img = s_img;
    }

    public String getS_firm() {
        return s_firm;
    }

    public void setS_firm(String s_firm) {
        this.s_firm = s_firm;
    }

    public String getSmodel() {
        return smodel;
    }

    public void setSmodel(String smodel) {
        this.smodel = smodel;
    }

    public Integer getS_price() {
        return s_price;
    }

    public void setS_price(Integer s_price) {
        this.s_price = s_price;
    }

    public String getS_des() {
        return s_des;
    }

    public void setS_des(String s_des) {
        this.s_des = s_des;
    }

    public Smartphone() {

    }

    public Smartphone(String s_img, String s_firm, String smodel, Integer s_price, String s_des) {
        this.s_img = s_img;
        this.s_firm = s_firm;
        this.smodel = smodel;
        this.s_price = s_price;
        this.s_des = s_des;
    }

    public Set<Headphone> getHeadphones() {
        return headphones;
    }

    public void setHeadphones(Set<Headphone> headphones) {
        this.headphones = headphones;
    }

    public void addHeadphone(Headphone headphone) {
        this.headphones.add(headphone);
        headphone.getSmartphones().add(this);
    }

    public void removeHeadphone(long headphoneId) {
        Headphone headphone = this.headphones.stream().filter(t -> t.getId() == headphoneId).findFirst().orElse(null);
        if (headphone != null) {
            this.headphones.remove(headphone);
            headphone.getSmartphones().remove(this);
        }
    }
}

