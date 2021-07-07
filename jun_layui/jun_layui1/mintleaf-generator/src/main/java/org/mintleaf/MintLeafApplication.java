package org.mintleaf;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.mintleaf.dao")
public class MintLeafApplication {

	public static void main(String[] args) {
		SpringApplication.run(MintLeafApplication.class, args);
	}
}
