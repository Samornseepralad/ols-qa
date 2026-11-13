# Plan: ols-skill-fixes (R12, R14)

> Mirror of `Thitic9203/pluton-ai-agent` `docs/sdd/ols-skill-fixes/` (source of truth there, merged via pluton-ai-agent#79), kept here so ols-qa commits can cite it (`tools/sdd-gate`).

- **ไฟล์ที่แตะ (ใน ols-qa ถ้าได้สิทธิ์):** `skills/tc-review-workflow/SKILL.md` (ต่อข้อความในแถว MUST/NEVER เดิม 1 บรรทัด, ไม่เพิ่มบรรทัด) · `skills/procedures/test-data-prep-workflow/WORKFLOW.md` (+Step 8, +1 รายการ checklist, +3 แถว MUST/NEVER) — ดู `ols-qa-r12-r14.diff`
- **ไฟล์ที่แตะใน repo นี้:** `docs/sdd/ols-skill-fixes/*` เท่านั้น
- **โครงข้อมูล:** `data-register.md` ตาราง markdown 8 คอลัมน์ ต่อรอบ อยู่ในโฟลเดอร์หลักฐานของรอบ (ไม่มี dependency ใหม่ ไม่มีค่าใช้จ่าย)
- **ทางเลือกที่ชั่งแล้ว:** (ก) แก้ใน helix ตรง — ตก: ผิด D11 และถูก sync ทับ · (ข) เพิ่ม hook/สคริปต์ตรวจ — ตกรอบนี้: เกินขอบเขต ทำเป็นข้อกำหนดในสกิลก่อน · (ค) diff เสนอให้ตัดสิน — เลือก
- **อาจพัง:** worker ของ agent ที่อ่านสกิล Step 8 ต้องมี API ลบจริง (delete ของ media/course/learning-path ยังไม่ได้ยืนยันว่าทุกชนิดมี) — Step 8 จึงให้ `deletable: unknown` นับเป็น `no` และ kept ต้องมีผู้อนุมัติ · ข้อความ Verdict "Unverified" ใหม่ต้องไม่ชนรูปแบบรายงานของ ols-tc-review-loop (ตรวจตอน wire ฝั่ง pluton-ai-agent)
