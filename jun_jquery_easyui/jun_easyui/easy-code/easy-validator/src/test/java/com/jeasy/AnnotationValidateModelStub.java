package com.jeasy;

import java.util.Date;
import java.util.List;

import com.jeasy.validate.*;

import lombok.Data;

@Data
public class AnnotationValidateModelStub implements AnnotationValidable{

	@ValidateNotLaterThan(laterTime="endTime")
    private Date startTime;
    private Date endTime;

    @ValidateStringIn(value="Critical,Major,Minor,Warning,Alarms,All")
    private String alarmClass;
    
    @ValidateStringIn(value="Communication,Environment,Equipment,Processing,Quality of Service,All")
    private String alarmType;

    @ValidateStringIn(value="Active,All")
    private String alarmStatus;

    @ValidateDigit
    @ValidateLength(minLength=0, maxLength=9)
    private String alarmNumber;

    @ValidateNotEmpty
    private List<Object> moList;
    
    @ValidateNotNull
    private String suppleInfo;
    
    @ValidatePattern(pattern="\\d{0,9}")
    private String gid;
    
    @ValidateInt(min=1,max=100)
    private Integer maxRows;
}
