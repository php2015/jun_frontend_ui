import static org.junit.Assert.*;

import java.io.File;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;

import com.bcs.codgen.model.InOutType;
import com.bcs.codgen.model.OutputModel;
import com.bcs.codgen.service.BuildConfig;
import com.bcs.codgen.service.Builder;
import com.bcs.codgen.service.impl.CodeBuilder;
import com.bcs.codgen.service.impl.ProjectBuildConfig;
import com.bcs.codgen.util.ProjectConfig;
import com.bcs.codgen.util.ProjectConfigHelper;

public class FrameworkBuildConfigHandlerTest {

	@Test
	public void testAfterGetOutputModel() {
		ProjectConfig projectConfig = ProjectConfigHelper.getDefaultProjectConfig("../config/codgen-FRAMEWORK.xml");
		BuildConfig buildConfig = new ProjectBuildConfig(projectConfig);
		
		Builder builder = new CodeBuilder(buildConfig);
		Map<String,OutputModel> omMap = builder.build();
		for(Entry<String,OutputModel> entry : omMap.entrySet()){
			//System.out.println("生成内容="+entry.getValue().getOutput());
			if(entry.getValue().getType()==InOutType.FILE){
				assertTrue("文件没有生成="+entry.getValue().getOutput()
						, new File(entry.getValue().getOutput()).exists());
			}
		}
	}

}
