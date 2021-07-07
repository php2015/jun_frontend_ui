package cn.javabb.sys.mapper;

import lombok.Data;
import lombok.Getter;

@Data
public class Person {

    @Getter
    private int id;
    
    private int age;
}