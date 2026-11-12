# Spec: ข้อเสนอแก้สกิล ols-qa (R12, R14)

> Mirror of `Thitic9203/pluton-ai-agent` `docs/sdd/ols-skill-fixes/` (source of truth there, merged via pluton-ai-agent#79), kept here so ols-qa commits can cite it (`tools/sdd-gate`).

สถานะ: **ทำเป็น PR แล้ว [ols-qa#115](https://github.com/Thitic9203/ols-qa/pull/115) (ยังไม่ merge; สิทธิ์เขียน 3 ไฟล์ เจ้าของงานอนุมัติ 6 Nov 2026)** · แผน L5 (อนุมัติ 4 Nov 2026) · `docs/plans/ols-agent-remaining.md` R12, R14

## ผลสำรวจต้นทาง (หลักฐาน 6 Nov 2026)

| ที่ | ผล |
|---|---|
| `Thitic9203/ols-qa` (local clone) (origin/main `9698cfc`) | **ต้นทางจริง** ของ `skills/tc-review-workflow/SKILL.md` และ `skills/procedures/test-data-prep-workflow/WORKFLOW.md` (`test-data-prep-workflow/SKILL.md` เป็น stub ชี้ไป WORKFLOW.md) |
| `Thitic9203/helix` origin/main | สำเนา: ไฟล์ทั้งสองเหมือน ols-qa ทุกไบต์ (`diff` ว่าง) commit ล่าสุดเป็น `chore(sync): pull shared skill updates from ols-qa` และ `ols-qa/scripts/sync-skills-to-helix.sh` ส่งต่อทางเดียว ols-qa → helix |
| `~/.helix` | ที่ติดตั้ง (v1.5.167) ไม่ใช่ต้นทาง |

ข้อสรุป: แก้ใน helix ตรงๆ จะถูกทับตอน sync ครั้งถัดไป และผิด D11 (สกิลต้องตรงกับ ols-qa) ต้นทางที่ต้องแก้คือ `ols-qa` ซึ่งเป็น **อ่านอย่างเดียว** (D13/D17) จึงไม่ได้แก้ ทำเป็น diff ในโฟลเดอร์นี้ให้เจ้าของงานตัดสิน

## กฎ

- **R12-1** เมื่อรีวิว TC และ Expected Result ของแถวใดไม่มีแหล่งยืนยันของ ticket นั้น (AC/EC, Figma node, PRD/Confluence, คอมเมนต์ PO/dev ระบุผู้เขียนและวันที่) สกิลต้องไม่ติดแถวนั้นเป็น Good และต้องไม่ผ่านเอกสาร · ต้องไม่ยืม expected จาก ticket อื่น/ฟีเจอร์คล้าย/ความจำ · ถ้อยคำมี hedge ("น่าจะ", "should be") นับเป็นไม่มีแหล่ง · แหล่ง: global ข้อ 10; plan R12
- **R12-2** แถวเช่นนั้นต้องขึ้น Need Improve เป็น "unverified expected" พร้อม → Suggest ที่อ้างแหล่ง/ระบุคนยืนยัน และเอกสารได้ verdict **Unverified** จนกว่าจะมีแหล่ง · ข้อความเป็นแถว NEVER ใหม่ต่อจากแถว design-source เดิมของ `tc-review-workflow/SKILL.md` (แถวเดิมต้องคงข้อความเดิมทุกตัวอักษร เพราะ Helix gate `rule-lines` นับการต่อข้อความเป็นการตัดบรรทัดกฎ · เจ้าของงานเลือก "Restore the line (แนะนำ)" 12 Nov 2026 · `tools/tc-review-one-question` จำกัด ≤403 บรรทัด ไฟล์มี 389)
- **R14-1** เมื่อ workflow test-data-prep สร้าง record ต้องลงทะเบียนทันทีใน `data-register.md`: id, type, env, created_by, ticket, created_at, deletable (yes/no/unknown), cleanup · แหล่ง: plan R14 (ticket ตัวอย่างในสกิลใช้ placeholder `{TICKET_KEY}` เพราะ `skill-text-guard` ห้ามมี ticket key)
- **R14-2** เมื่อรอบเทสจบ (ผ่าน/ไม่ผ่าน/ติด) ต้องลบ record ที่ `deletable: yes` ตามลำดับย้อน, อ่านกลับยืนยันว่าหายแล้ว · ที่เก็บไว้ต้องมีเหตุผลและผู้อนุมัติ
- **R14-3** ต้องไม่ลบ record ที่ไม่ได้สร้างในรอบนี้ และต้องไม่ลบแบบ bulk/ตามแพตเทิร์นชื่อ · record ที่ reuse (Step 1) = `deletable: no`
- **R14-4** ไม่ "เสร็จ" จนผ่านเช็กลิสต์ทางออก 5 ข้อ (ครบทะเบียน, ไม่มี pending, อ่านกลับแล้ว, kept มีเหตุผล, แนบทะเบียนกับรายงาน)

## ขอบเขต / ข้อยกเว้น
ไฟล์ที่แก้ได้ (เจ้าของงาน 6 Nov 2026): `skills/tc-review-workflow/SKILL.md`, `skills/test-data-prep-workflow/SKILL.md` (stub ไม่ได้แก้), `skills/procedures/test-data-prep-workflow/WORKFLOW.md` · ไม่แตะ references/helix · ไม่ลบ record จริงที่ค้างบน dev (งานแยก ต้องอนุมัติ)

## Done when
- ols-qa#115 มีแค่ 2 ไฟล์ข้างต้น (diff ตรงกับ `ols-qa-r12-r14.diff` = cf820ca) และ `git apply --check` ผ่านบน ols-qa origin/main `9698cfc`
- pre-push ของ ols-qa ผ่านทั้งชุด (`skill-text-guard` 16/16, `tc-review-one-question`), `helix-link-check.sh` OK 1857 links
- เจ้าของงานรีวิวและ merge #115 เอง แล้วสั่ง sync: รัน `scripts/sync-skills-to-helix.sh` ใน ols-qa หลังเช็ก diff สองไฟล์ ols-qa main = helix (D11) · ยังไม่ push ไป helix
