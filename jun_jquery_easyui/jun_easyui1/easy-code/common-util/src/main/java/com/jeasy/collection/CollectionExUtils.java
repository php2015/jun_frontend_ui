package com.jeasy.collection;

import java.io.*;
import java.util.*;

import org.apache.commons.collections.list.SetUniqueList;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ArrayUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public final class CollectionExUtils {

	private CollectionExUtils() {
	}

    public static <T> List<T> toArrayList(Collection<T> coll) {
        if (coll == null) {
            throw new NullPointerException();
        }
        if (coll instanceof List) {
            return (List) coll;
        } else {
            return new ArrayList<>(coll);
        }
    }

    public static <T> Set<T> toHashSet(Collection<T> coll) {
        if (coll == null) {
            throw new NullPointerException();
        }
        if (coll instanceof Set) {
            return (Set) coll;
        } else {
            return new HashSet<>(coll);
        }
    }

    public static <T> LinkedList<T> toLinkedList(Collection<T> list) {
        LinkedList<T> queue;
        if (list instanceof LinkedList) {
            queue = (LinkedList<T>)list;
        } else {
            queue = new LinkedList<>(list);
        }
        return queue;
    }


	public static List<Long> toLongList(long[] ids) {

		if (ArrayUtils.isEmpty(ids)) {
			return Collections.emptyList();
		}

		List<Long> result = SetUniqueList.decorate(new ArrayList<Long>());
		for (long id : ids) {
			result.add(id);
		}
		return result;
	}

	public static byte[] toByteArray(long[] ids) {

		if (ArrayUtils.isEmpty(ids)) {
			return new byte[0];
		}

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		DataOutputStream dos = new DataOutputStream(bos);
		try {
			for (long dealId : ids) {
				dos.writeLong(dealId);
			}
			dos.writeLong(-1);
			return bos.toByteArray();
		} catch (Exception e) {
			log.error("error exception : ", e);
		} finally {
			IOUtils.closeQuietly(bos);
			IOUtils.closeQuietly(dos);
		}
		return new byte[0];
	}

	public static long[] toLongArray(byte[] bytes) {

		if (ArrayUtils.isEmpty(bytes)) {
			return new long[0];
		}

		ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
		DataInputStream dis = new DataInputStream(bais);
		List<Long> dealIdList = new ArrayList<>();
		try {
			while(true) {
				long dealId = dis.readLong();
				if (dealId != -1) {
					dealIdList.add(dealId);
				} else {
					break;
				}
			}
		} catch (Exception e) {
			if(!(e instanceof EOFException)){
				log.error("error exception", e);
			}
		} finally {
			IOUtils.closeQuietly(bais);
			IOUtils.closeQuietly(dis);
		}
		Long[] dealIds = new Long[dealIdList.size()];
		dealIdList.toArray(dealIds);
		return ArrayUtils.toPrimitive(dealIds);
	}
}
