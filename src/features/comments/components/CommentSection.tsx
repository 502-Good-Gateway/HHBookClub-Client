import { useState } from 'react';
import {
    useComments,
    useCreateComment,
    useUpdateComment,
    useDeleteComment,
} from '../hooks/useComments';
import type { Comment } from '../types';

interface CommentSectionProps {
    postId: number;
    isAuthenticated: boolean;
}

/**
 * Formats date string for display
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });
};

/**
 * Single comment item component
 */
interface CommentItemProps {
    comment: Comment;
    onUpdate: (commentId: number, content: string) => Promise<void>;
    onDelete: (commentId: number) => Promise<void>;
    isAuthenticated: boolean;
}

function CommentItem({ comment, onUpdate, onDelete, isAuthenticated }: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = async () => {
        if (!editContent.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            await onUpdate(comment.id, editContent.trim());
            setIsEditing(false);
        } catch {
            alert('댓글 수정에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        setIsSubmitting(true);
        try {
            await onDelete(comment.id);
        } catch {
            alert('댓글 삭제에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = () => {
        setEditContent(comment.content);
        setIsEditing(false);
    };

    return (
        <li className="p-3 border-b border-gray-100 dark:border-gray-700 text-sm">
            <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                        {comment.author.profileImage ? (
                            <img
                                src={comment.author.profileImage}
                                alt={comment.author.nickname}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                👤
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-600 dark:text-gray-300 font-medium text-xs">
                            {comment.author.nickname}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-[10px]">
                            {formatDate(comment.createdAt)}
                        </span>
                    </div>
                </div>
                {isAuthenticated && !isEditing && (
                    <div className="flex gap-2 text-xs">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="mt-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded resize-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                        rows={2}
                        disabled={isSubmitting}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={handleCancelEdit}
                            disabled={isSubmitting}
                            className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={isSubmitting}
                            className="px-3 py-1 text-xs bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50"
                        >
                            {isSubmitting ? '수정 중...' : '수정'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {comment.content}
                </p>
            )}
        </li>
    );
}

/**
 * Comment section component with list and input form
 */
export default function CommentSection({ postId, isAuthenticated }: CommentSectionProps) {
    const { data: comments, isLoading, isError } = useComments(postId);
    const createCommentMutation = useCreateComment(postId);
    const updateCommentMutation = useUpdateComment(postId);
    const deleteCommentMutation = useDeleteComment(postId);

    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!newComment.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);
        try {
            await createCommentMutation.mutateAsync({ content: newComment.trim() });
            setNewComment('');
        } catch {
            alert('댓글 등록에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (commentId: number, content: string) => {
        await updateCommentMutation.mutateAsync({ commentId, data: { content } });
    };

    const handleDelete = async (commentId: number) => {
        await deleteCommentMutation.mutateAsync(commentId);
    };

    return (
        <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
                    댓글 {comments?.length ?? 0}개
                </span>
            </div>

            {/* Comments List */}
            <ul>
                {/* Loading State */}
                {isLoading && (
                    <li className="p-6 text-center text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
                            <span className="text-sm">댓글을 불러오는 중...</span>
                        </div>
                    </li>
                )}

                {/* Error State */}
                {isError && (
                    <li className="p-6 text-center text-red-500 dark:text-red-400">
                        <span className="text-sm">댓글을 불러오는데 실패했습니다.</span>
                    </li>
                )}

                {/* Empty State */}
                {!isLoading && !isError && comments?.length === 0 && (
                    <li className="p-6 text-center text-gray-500 dark:text-gray-400">
                        <span className="text-sm">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</span>
                    </li>
                )}

                {/* Comments */}
                {!isLoading &&
                    !isError &&
                    comments?.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            isAuthenticated={isAuthenticated}
                        />
                    ))}
            </ul>

            {/* Comment Input */}
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50">
                {isAuthenticated ? (
                    <>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded resize-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                            rows={2}
                            disabled={isSubmitting}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-4 py-1.5 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50"
                            >
                                {isSubmitting ? '등록 중...' : '등록'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                        댓글을 작성하려면 로그인이 필요합니다.
                    </div>
                )}
            </div>
        </div>
    );
}
